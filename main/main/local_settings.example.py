from .settings import *  # noqa

SECRET_KEY = 'django-insecure-_q-#21_22#c5ru!h^%x-&qm5v0j2r+(ny-tu^#-p!#7z(6ovaw0)!'

DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'webtinhoc_db',

        # postgres://default:iSsq2GRYdfL4@ep-bold-resonance-59971059.ap-southeast-1.postgres.vercel-storage.com:5432/verceldb
        # 'NAME': 'verceldb',
        # 'USER': 'default',
        # 'PASSWORD': 'iSsq2GRYdfL4',
        # 'HOST': 'ep-bold-resonance-59971059.ap-southeast-1.postgres.vercel-storage.com',
        # 'PORT': '5432'
    }
}

AUTH_PASSWORD_VALIDATORS = []

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'cookie',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',  # thêm X-CSRFToken vào danh sách
    'x-requested-with',
]

CORS_ORIGIN_WHITELIST = [
    "http://192.168.0.201:3002/",
    "http://localhost:3000/",
    "https://next-webtinhoc.vercel.app/"
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8000",
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://192.168.0.201:3000",
    "https://next-webtinhoc.vercel.app"
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8000/",
    "http://localhost:3000/",
    "http://192.168.0.201:3000/",
    "https://next-webtinhoc.vercel.app/"
]

DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
STATIC_URL = "/static/"

MEDIA_URL = "/media/"
MEDIA_ROOT = str(BASE_DIR / "media")

SITE_DOMAIN = "http://localhost:8000"

#email dev với mailhog
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "127.0.0.1"
EMAIL_PORT = 1025
EMAIL_SUBJECT_PREFIX = "[ComicPlatform] "

#algolia
ALGOLIA = {
    'APPLICATION_ID': '8311Q1EF1U',
    'API_KEY': 'a256a5774cb1baa6eb39c0d7e33db41f'
}

EXP = {
    'like': 5,
    'comment': 5,
    'read_chapter': 5,
    'rating': 5
}

FEEDBACK = (
    ('system', 'Báo cáo hệ thống'),
)

STORYREPORT = (
    ('story_reports', 'Báo cáo truyện'),
)