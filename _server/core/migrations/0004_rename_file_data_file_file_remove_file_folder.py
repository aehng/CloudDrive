# Generated by Django 4.2.7 on 2023-12-07 05:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_rename_file_data_file_file_data_alter_file_folder'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='file_data',
            new_name='file',
        ),
        migrations.RemoveField(
            model_name='file',
            name='folder',
        ),
    ]