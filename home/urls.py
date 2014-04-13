from django.conf.urls import patterns, url
from home.views import HomeView, SpaceWalkView, MoonView, EarthView

urlpatterns = patterns(
    '',
    url(r'^$', HomeView.as_view(), name='home_page'),
    url(r'^1$', SpaceWalkView.as_view(), name='space_walk'),
    url(r'^2$', MoonView.as_view(), name='moon'),
    url(r'^3$', EarthView.as_view(), name='earth'),
)
