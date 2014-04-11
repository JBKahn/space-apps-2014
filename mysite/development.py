import os

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = ['static']
STATIC_ROOT = "sitestatic"

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    'django.contrib.staticfiles.finders.FileSystemFinder',
)

# Database
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Test Email
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'orlykahnmakeupartist@gmail.com'
EMAIL_HOST_PASSWORD = 'testpassword'
DEFAULT_FROM_EMAIL = 'orlykahnmakeupartist@gmail.com'

# Security
ALLOWED_HOSTS = []
SECRET_KEY = 'u=^)5nuz)f)*svbu22kxg^(g+w2q*zk!x##o^hk7((_+87dsoc'
DEBUG = True
TEMPLATE_DEBUG = True
