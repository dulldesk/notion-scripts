import datetime

t1 = datetime.datetime(2024, 1, 10, 0, 0)

for i in range(10):
	print(f"['T{i+1}', '{t1.strftime('%Y-%m-%d')}'],")
	t1 += datetime.timedelta(days=7)
