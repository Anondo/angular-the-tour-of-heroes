from django.conf.urls import url
from rest_framework.routers import format_suffix_patterns , SimpleRouter

from .views import HeroViewSet

router = SimpleRouter()
router.register("heroes" , HeroViewSet , base_name="heroes")

urlpatterns = router.urls

urlpatterns = format_suffix_patterns(urlpatterns)
