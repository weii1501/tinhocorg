#python3 -m venv /opt/render/project/src/.venv
#source /opt/render/project/src/.venv/bin/activate
#
#/opt/render/project/src/.venv/bin/python -m pip install --upgrade pip
#pip install -r requirements.txt
#pip install django
#pip install channels
#pip install daphne
#pip install djangorestframework
#pip install django-ckeditor
#pip install django-cors-headers
#pip install easy-thumbnails
#pip install django-allauth
#pip install psycopg2-binary==2.9.5
#pip install django-autoslug
#pip install whitenoise
#pip install djangorestframework_simplejwt
#pip install djangorestframework-camel-case
#pip install beautifulsoup4
#pip install gunicorn==20.1.0
#pip install whitenoise==6.2.0
#pip install Brotli==1.0.9
#pip install drf_spectacular
#pip install rpds-py
#pip install -r requirementsVercel.txt


#python manage.py collectstatic --noinput

# build_files.sh
pip install -r requirements.txt

# make migrations
python3.9 manage.py migrate
python3.9 manage.py collectstatic