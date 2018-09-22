from __future__ import unicode_literals

from django.db import models

class Hero(models.Model):
    name = models.CharField(max_length = 140)

    def __str__(self):
        return self.name
