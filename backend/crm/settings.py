"""
Django settings for CRM Project.
"""

from pathlib import Path
from datetime import timedelta

from decouple import config

# ============================================================
# Base Directory
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

# ============================================================
# Security
# ============================================================

SECRET_KEY = config("SECRET_KEY")

DEBUG = config("DEBUG", cast=bool, default=False)

ALLOWED_HOSTS = [
    host.strip()
    for host in config(
        "ALLOWED_HOSTS",
        default="localhost,127.0.0.1"
    ).split(",")
]

CSRF_TRUSTED_ORIGINS = [
    origin.strip()
    for origin in config(
        "CSRF_TRUSTED_ORIGINS",
        default="http://localhost,http://127.0.0.1"
    ).split(",")
]

CSRF_COOKIE_SECURE = config(
    "CSRF_COOKIE_SECURE",
    cast=bool,
    default=False
)

SESSION_COOKIE_SECURE = config(
    "SESSION_COOKIE_SECURE",
    cast=bool,
    default=False
)

SECURE_PROXY_SSL_HEADER = (
    "HTTP_X_FORWARDED_PROTO",
    "https",
)

# ============================================================
# Installed Applications
# ============================================================

INSTALLED_APPS = [

    # Django Apps

    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    # Third Party Apps

    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "django_filters",

    # Local Apps

    "accounts",
    "customers",
    "leads",
    "deals",
    "dashboard",
    "tasks",
    "notifications",
    "activities",
    "reports",
    "communications",
]

# ============================================================
# Middleware
# ============================================================

MIDDLEWARE = [

    "corsheaders.middleware.CorsMiddleware",

    "django.middleware.security.SecurityMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",

    "django.middleware.common.CommonMiddleware",

    "django.middleware.csrf.CsrfViewMiddleware",

    "django.contrib.auth.middleware.AuthenticationMiddleware",

    "django.contrib.messages.middleware.MessageMiddleware",

    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# ============================================================
# URL Configuration
# ============================================================

ROOT_URLCONF = "crm.urls"

WSGI_APPLICATION = "crm.wsgi.application"

# ============================================================
# Templates
# ============================================================

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",

        "DIRS": [],

        "APP_DIRS": True,

        "OPTIONS": {

            "context_processors": [

                "django.template.context_processors.request",

                "django.contrib.auth.context_processors.auth",

                "django.contrib.messages.context_processors.messages",
            ]
        },
    }
]

# ============================================================
# Database
# ============================================================

DATABASES = {

    "default": {

        "ENGINE": "django.db.backends.postgresql",

        "NAME": config("DB_NAME"),

        "USER": config("DB_USER"),

        "PASSWORD": config("DB_PASSWORD"),

        "HOST": config("DB_HOST"),

        "PORT": config("DB_PORT"),
    }
}

# ============================================================
# Password Validators
# ============================================================

AUTH_PASSWORD_VALIDATORS = [

    {
        "NAME":
        "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },

    {
        "NAME":
        "django.contrib.auth.password_validation.MinimumLengthValidator",
    },

    {
        "NAME":
        "django.contrib.auth.password_validation.CommonPasswordValidator",
    },

    {
        "NAME":
        "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# ============================================================
# Internationalization
# ============================================================

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Kolkata"

USE_I18N = True

USE_TZ = True

# ============================================================
# Static & Media
# ============================================================

STATIC_URL = "/static/"

STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"

MEDIA_ROOT = BASE_DIR / "media"

# ============================================================
# Default PK
# ============================================================

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "accounts.User"

# ============================================================
# CORS
# ============================================================

CORS_ALLOW_ALL_ORIGINS = config(
    "CORS_ALLOW_ALL_ORIGINS",
    cast=bool,
    default=True
)

# ============================================================
# Logging
# ============================================================

LOGGING = {

    "version": 1,

    "disable_existing_loggers": False,

    "handlers": {

        "console": {

            "class": "logging.StreamHandler",

        },
    },

    "root": {

        "handlers": ["console"],

        "level": "INFO",
    },
}

# ============================================================
# Django REST Framework
# ============================================================

REST_FRAMEWORK = {

    "DEFAULT_AUTHENTICATION_CLASSES": (

        "rest_framework_simplejwt.authentication.JWTAuthentication",

    ),

    "DEFAULT_FILTER_BACKENDS": [

        "django_filters.rest_framework.DjangoFilterBackend",

        "rest_framework.filters.SearchFilter",

        "rest_framework.filters.OrderingFilter",
    ],

    "DEFAULT_PAGINATION_CLASS":

    "rest_framework.pagination.PageNumberPagination",

    "PAGE_SIZE": 10,
}

# ============================================================
# JWT
# ============================================================

SIMPLE_JWT = {

    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),

    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),

    "ROTATE_REFRESH_TOKENS": False,

    "BLACKLIST_AFTER_ROTATION": False,
}