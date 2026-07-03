from rest_framework import status as http_status
from rest_framework import viewsets
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer
from .services import TaskStatsService


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(_request: Request) -> Response:
    """Lightweight liveness probe that does not touch the database."""
    return Response({"status": "ok"}, status=http_status.HTTP_200_OK)


class TaskViewSet(viewsets.ModelViewSet):
    """
    Full CRUD for tasks.

    Supports:
      - ?search=<text>              (title / description)
      - ?status=todo|in_progress|done
      - ?priority=low|medium|high
      - ?ordering=due_date|-created_at|priority|title
    """

    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    search_fields = ["title", "description"]
    ordering_fields = ["created_at", "updated_at", "due_date", "priority", "title"]
    ordering = ["-created_at"]

    def get_queryset(self):
        queryset = super().get_queryset()
        params = self.request.query_params

        status_param = params.get("status")
        if status_param in Task.Status.values:
            queryset = queryset.filter(status=status_param)

        priority_param = params.get("priority")
        if priority_param in Task.Priority.values:
            queryset = queryset.filter(priority=priority_param)

        return queryset

    @action(detail=False, methods=["get"])
    def stats(self, request: Request) -> Response:
        """Aggregated counts for the dashboard cards (respects active filters)."""
        return Response(TaskStatsService.build(self.filter_queryset(self.get_queryset())))
