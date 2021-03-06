from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        return {"current_page_name": "Home"}


class SpaceWalkView(TemplateView):
    template_name = 'home2.html'

    def get_context_data(self, **kwargs):
        return {"current_page_name": "Home"}


class MoonView(TemplateView):
    template_name = 'home3.html'

    def get_context_data(self, **kwargs):
        return {"current_page_name": "Home"}


class EarthView(TemplateView):
    template_name = 'home4.html'

    def get_context_data(self, **kwargs):
        return {"current_page_name": "Home"}
