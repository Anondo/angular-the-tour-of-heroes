from rest_framework.response import Response
from rest_framework import viewsets

from .models import Hero
from .serializers import HeroSerializer

class HeroViewSet(viewsets.ModelViewSet):
    serializer_class = HeroSerializer

    def get_queryset(self):
        queryset = Hero.objects.all()

        name = self.request.query_params.get('name' , None)

        if name:
            queryset = queryset.filter(name__startswith = name)

        return queryset
