from accounts.models import User
from customers.models import Customer
from tasks.models import Task
from datetime import date, timedelta

admin = User.objects.get(username="admin")
dp = User.objects.get(username="dp")
dinesh = User.objects.get(username="dinesh")
makesh = User.objects.get(username="makesh")

tasks = [

    ("Call Rahul", "Rahul Sharma", makesh, "CALL", "PENDING"),

    ("Demo Priya", "Priya Kumar", makesh, "MEETING", "IN_PROGRESS"),

    ("Follow Up Arjun", "Arjun Singh", makesh, "FOLLOW_UP", "COMPLETED"),

    ("Meeting Sneha", "Sneha Patel", dp, "MEETING", "PENDING"),

    ("Proposal Vijay", "Vijay Raj", dp, "EMAIL", "COMPLETED"),

    ("Call Akash", "Akash", dinesh, "CALL", "PENDING"),

    ("Demo Divya", "Divya", dinesh, "MEETING", "IN_PROGRESS"),

    ("Follow Surya", "Surya", makesh, "FOLLOW_UP", "COMPLETED"),

    ("Close Karthik", "Karthik", dp, "EMAIL", "PENDING"),

    ("Meeting Meena", "Meena", dinesh, "MEETING", "COMPLETED"),

]

for title, customer_name, assigned_to, task_type, status in tasks:

    customer = Customer.objects.get(name=customer_name)

    Task.objects.create(
        title=title,
        description="CRM Demo Task",
        customer=customer,
        assigned_to=assigned_to,
        created_by=admin,
        task_type=task_type,
        status=status,
        due_date=date.today() + timedelta(days=7)
    )

print("✅ Demo tasks created successfully.")