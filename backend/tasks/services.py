"""
Business logic that does not belong in views or serializers.

Keeping aggregation logic here keeps the ViewSet thin (single responsibility)
and makes the statistics independently testable.
"""
from datetime import date

from django.db.models import Count, QuerySet

from .models import Task


class TaskStatsService:
    @staticmethod
    def build(queryset: QuerySet[Task]) -> dict:
        total = queryset.count()

        by_status = {row["status"]: row["count"] for row in
                     queryset.values("status").annotate(count=Count("id"))}
        by_priority = {row["priority"]: row["count"] for row in
                       queryset.values("priority").annotate(count=Count("id"))}

        done = by_status.get(Task.Status.DONE, 0)
        overdue = queryset.filter(
            due_date__lt=date.today()
        ).exclude(status=Task.Status.DONE).count()

        return {
            "total": total,
            "todo": by_status.get(Task.Status.TODO, 0),
            "in_progress": by_status.get(Task.Status.IN_PROGRESS, 0),
            "done": done,
            "overdue": overdue,
            "by_priority": {
                "low": by_priority.get(Task.Priority.LOW, 0),
                "medium": by_priority.get(Task.Priority.MEDIUM, 0),
                "high": by_priority.get(Task.Priority.HIGH, 0),
            },
            "completion_rate": round((done / total) * 100) if total else 0,
        }
