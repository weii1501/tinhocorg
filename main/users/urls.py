from django.urls import path

from . import views

from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('profile/', views.get_user_profile, name='user-profile'),
    # Other user-related URLs for the app
    # api login
    path('login/', views.login_api_view),
    # api register
    path('register/', views.create_user, name='user-create'),
    # api logout
    path('logout/', views.logout_api_view),
    # api get list social login
    path('get-list-social-login/', views.get_list_social_login),
    # api get list social login
    # path('social-auth/signup/', signup, name="socialaccount_signup"),
    # path("social-auth/google/", GoogleLogin.as_view(), name="google_login"),
    path('about-user/<int:user_id>/', views.about_user, name='about-user'),
    # api post view
    path('post-view/', views.post_view, name='post-view'),
    # api filter choice
    path('filter-choice/', views.filter_choice, name='filter-choice'),
    # api filter choice list view
    path('filter-choice-list-view/', views.FilterChoiceListView.as_view(), name='filter-choice-list-view'),
    #     update info user
    path('update-info-user/', views.update_info_user, name='update-info-user'),
    #     jwt
    path('token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    # all activity
    path('all-activity-threads/', views.ListActivityThreadsAPIView.as_view(), name='all-activity'),

    path('all-activity-articles/', views.ListActivityArticlesAPIView.as_view(), name='all-activity'),
    path('user-filter-articles/', views.UserFilterArticleAPIView.as_view(), name='user-filter-article'),
    path('user-filter-threads/', views.UserFilterThreadAPIView.as_view(), name='user-filter-article'),
]