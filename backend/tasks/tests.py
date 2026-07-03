from datetime import date, timedelta

from rest_framework import status
from rest_framework.test import APITestCase

from .models import Task


class TaskCrudTests(APITestCase):
    def setUp(self):
        self.list_url = "/api/tasks/"

    def _create(self, **overrides):
        payload = {"title": "Write report", "priority": "high"}
        payload.update(overrides)
        return self.client.post(self.list_url, payload, format="json")

    def test_create_task(self):
        response = self._create()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 1)
        self.assertEqual(response.data["status"], "todo")  # default
        self.assertEqual(response.data["priority_display"], "High")

    def test_blank_title_is_rejected(self):
        response = self._create(title="   ")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data)

    def test_list_and_read(self):
        task = Task.objects.create(title="Read me")
        list_res = self.client.get(self.list_url)
        self.assertEqual(list_res.status_code, status.HTTP_200_OK)
        self.assertEqual(list_res.data["count"], 1)

        detail_res = self.client.get(f"{self.list_url}{task.id}/")
        self.assertEqual(detail_res.data["title"], "Read me")

    def test_update_and_partial_update(self):
        task = Task.objects.create(title="Old")
        put = self.client.put(
            f"{self.list_url}{task.id}/",
            {"title": "New", "status": "done"},
            format="json",
        )
        self.assertEqual(put.status_code, status.HTTP_200_OK)
        self.assertEqual(put.data["status"], "done")

        patch = self.client.patch(
            f"{self.list_url}{task.id}/", {"priority": "low"}, format="json"
        )
        self.assertEqual(patch.data["priority"], "low")

    def test_delete(self):
        task = Task.objects.create(title="Delete me")
        response = self.client.delete(f"{self.list_url}{task.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)

    def test_filter_by_status_and_search(self):
        Task.objects.create(title="Alpha", status="done")
        Task.objects.create(title="Beta", status="todo")
        self.assertEqual(self.client.get(f"{self.list_url}?status=done").data["count"], 1)
        self.assertEqual(self.client.get(f"{self.list_url}?search=Beta").data["count"], 1)

    def test_stats_endpoint(self):
        Task.objects.create(title="a", status="done")
        Task.objects.create(title="b", status="todo")
        Task.objects.create(
            title="late", status="todo", due_date=date.today() - timedelta(days=1)
        )
        stats = self.client.get(f"{self.list_url}stats/")
        self.assertEqual(stats.status_code, status.HTTP_200_OK)
        self.assertEqual(stats.data["total"], 3)
        self.assertEqual(stats.data["done"], 1)
        self.assertEqual(stats.data["overdue"], 1)
        self.assertEqual(stats.data["completion_rate"], 33)
