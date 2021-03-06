from django.db import models
from django.db.models.fields import BooleanField
from markdownx.models import MarkdownxField
from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)
from django.contrib.auth.hashers import make_password  
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

class UserProfileManager(BaseUserManager):
    """Manager for user profiles"""

    # ユーザを作成するメソッド
    def create_user(self, email, name, password=None):
        """Create a new user profile"""

        # emailが入力されていないときはValueErrorを呼び出す
        if not email:
            raise ValueError('User must have an email address')

        # emailのドメインを小文字に変換
        email = self.normalize_email(email)
        # UserProfileモデルを参照してuserを定義
        user = self.model(email=email, name=name)
        # userが入力したパスワードをハッシュ化
        user.set_password(password)
        # settings.pyでdefaultに設定されているDBに保存
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):
        """Create and save a new superuser with given details"""

        # 上記create_userを利用
        user = self.create_user(email, name, password)

        # superuserの権限を適用
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Database model for users in the system"""

    # カラム名 = データ型（オプション）
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    # ユーザが退会したらここをFalseにする（論理削除）
    is_active = models.BooleanField(default=True)
    # 管理画面にアクセスできるか
    is_staff = models.BooleanField(default=False)
    # Managerのメソッドを使えるようにする
    objects = UserProfileManager()
    # emailを利用したログイン認証に変更
    USERNAME_FIELD = 'email'
    # 必須項目追加
    REQUIRED_FIELDS = ['name']

    # 1つのnameフィールドで表示したいので、既存のメソッドをオーバーライド
    def get_full_name(self):
        """Retrieve full name of user"""
        return self.name

    def get_short_name(self):
        """Retrieve short name of user"""
        return self.name

    def __str__(self):
        return self.email


# Create your models here.
class Dialy(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now) # 日付と時間のフィールド
    published_date = models.DateTimeField(blank=True, null=True)
    category = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    text = MarkdownxField()
    isOpen = BooleanField()


    def __str__(self):
        return self.title
        
class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=20)

