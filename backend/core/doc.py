from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny

API_INFO = openapi.Info(
    title="Movie API",
    default_version="v1",
    description="Movie API documentation",
    # terms_of_service="https://www.google.com/policies/terms/",
    contact=openapi.Contact(email="adrien.montagu@socotec.com"),
    license=openapi.License(name="Copyright Socotec IO"),
)

schema_view = get_schema_view(API_INFO, public=True, permission_classes=(AllowAny,))
