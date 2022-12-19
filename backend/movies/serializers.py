from rest_framework import serializers
from .models import Actor, Movie, Review


class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
    avg_grade = serializers.DecimalField(
        required=False, allow_null=True, max_digits=5, decimal_places=2, read_only=True
    )

    class Meta:
        model = Movie
        read_only_fields = ["avg_grade"]
        fields = ("id", "title", "description", "actors", "avg_grade")


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"
