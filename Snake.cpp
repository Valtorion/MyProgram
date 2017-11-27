#include<iostream>
#include<Windows.h>
#include<time.h>
#include<conio.h>

using namespace std;
bool Gameover;
const int maxX = 20;
const int maxY = 20;
int fruitX, fruitY;

class Snake
{
public:
	int x, y;
	int tailX[100], tailY[100];
	int nTail = 0;
	int scope = 0;
	bool print = false;
	bool go = false;
	enum eDiraction { STOP = 0, LEFT, RIGHT, UP, DOWN };
	eDiraction dir;

	Snake() {
		dir = STOP;
		x = rand() % maxX;
		y = rand() % maxY;
	};
	~Snake() {};

	void DrawSnake(int i1, int g1)
	{
		if (i1 == y && g1 == x)
		{
			print = true;
			cout << "0";
		}
		else
		{
			print = false;
			for (int k = 0; k < nTail; k++)
			{
				if (tailX[k] == g1 && tailY[k] == i1)
				{
					print = true;
					cout << "o";
				}
			}
			
		}
		
	}

	void LogicSnake()
	{

		int preX = tailX[0];
		int preY = tailY[0];
		int pre2X, pre2Y;
		tailX[0] = x;
		tailY[0] = y;
		for (int i = 1; i < nTail; i++)
		{
			pre2X = tailX[i];
			pre2Y = tailY[i];
			tailX[i] = preX;
			tailY[i] = preY;
			preX = pre2X;
			preY = pre2Y;
		}

		switch (dir)
		{

		case LEFT:x--;
			break;
		case RIGHT:x++;
			break;
		case UP:y--;
			break;
		case DOWN:y++;
			break;

		}

		if (x >= maxX-1)
		{
			x = 0;
		}
		else if (x<0)x = maxX - 2;

		if (y >= maxY)
		{
			y = 0;
		}
		else if (y < 0)y = maxY - 2;

		
		for (int i = 0; i < nTail; i++)
		{
			if (tailX[i] == x && tailY[i] == y)
			{
				go = true;
			}
		}
		

		if (x == fruitX && y == fruitY)
		{
			scope += 10;
			fruitX = rand() % maxX;
			fruitY = rand() % maxY;
			nTail++;
		}

	}







};



void Setup()
{
	srand(time(0));
	Gameover = false;
	fruitX = rand() % maxX;
	fruitY = rand() % maxY;

}

void Draw(Snake* a, Snake* a1)
{
	Sleep(100);
	system("cls");
	for (int i = 0; i <= maxX; i++)
	{
		cout << "#";
	}
	cout << endl;

	for (int i = 0; i < maxY; i++)
	{
		for (int g = 0; g < maxX; g++)
		{
			if (g == 0 || g == maxX - 1)
			{
				cout << "#";
			}
			
		
			if (i==fruitY && g==fruitX)
			{
			
				cout << "+";

			}
			else {
				a->DrawSnake(i, g);
				a1->DrawSnake(i, g);

				
				if (!a->print && !a1->print)
				{
					cout << " ";
				}
			}

		}
		cout << endl;
	}


	for (int i = 0; i <= maxX; i++)
	{
		cout << "#";
	}
	cout << endl;
	cout << "Счет игрока#1 - " << a->scope << endl;
	cout << "Счет игрока#2 - " << a1->scope << endl;
}

void Input(Snake* a, Snake* a1)
{
	if (_kbhit())
	{
		switch (_getch())
		{
		case 'a': a->dir = a->LEFT;
			break;
		case '4': a1->dir = a1->LEFT;
			break;
		case '6': a1->dir = a1->RIGHT;
			break;
		case 'd': a->dir = a->RIGHT;
			break;
		case '8': a1->dir = a1->UP;
			break;
		case 'w': a->dir = a->UP;
			break;
		case 's': a->dir = a->DOWN;
			break;
		case '2': a1->dir = a1->DOWN;
			break;
		case 'x': Gameover=true;
			break;
		
		}
	}
}

void Logic(Snake* a, Snake* a1)
{
	a->LogicSnake();
	a1->LogicSnake();
	if (a->go)
	{
		Gameover = true;
		system("cls");
		cout << "Выйграл игрок 2" << endl;
		cout << "Счет игрока#1 - " << a->scope << endl;
		cout << "Счет игрока#2 - " << a1->scope << endl;

	}
	else
	{
		if (a1->go)
		{
			Gameover = true;
			system("cls");
			cout << "Выйграл игрок 1" << endl;
			cout << "Счет игрока#1 - " << a->scope << endl;
			cout << "Счет игрока#2 - " << a1->scope << endl;
		}
	}

	for (int i = 1; i < a->nTail; i++)
	{
		if (a->tailX[i] == a1->x && a->tailY[i] == a1->y)
		{
			a1->nTail += i;
			a->nTail -= i;
		}

	}
	for (int i = 1; i < a1->nTail; i++)
	{
		if (a1->tailX[i] == a->x && a1->tailY[i] == a->y)
		{
			a->nTail += i;
			a1->nTail -= i;
		}
	}

	if (a->x==a1->x && a->y==a1->y && a->nTail > a1->nTail)
	{
		Gameover = true;
		system("cls");
		cout << "Выйграл игрок 1" << endl;
		cout << "Счет игрока#1 - " << a->scope << endl;
		cout << "Счет игрока#2 - " << a1->scope << endl;
	}
	else
	{
		if (a->x == a1->x && a->y == a1->y && a->nTail < a1->nTail)
		{
			Gameover = true;
			system("cls");
			cout << "Выйграл игрок 2" << endl;
			cout << "Счет игрока#1 - " << a->scope << endl;
			cout << "Счет игрока#2 - " << a1->scope << endl;
		}
		if (a->x == a1->x && a->y == a1->y && a->nTail == a1->nTail)
		{
			Gameover = true;
			system("cls");
			cout << "Ничья" << endl;
			cout << "Счет игрока#1 - " << a->scope << endl;
			cout << "Счет игрока#2 - " << a1->scope << endl;
		}
	}

}

void main()
{
	SetConsoleCP(1251);
	SetConsoleOutputCP(1251);
	Snake s1, s2;
	Setup();
	while (!Gameover)
	{
		Draw(&s1,&s2);
		Input(&s1,&s2);
		Logic(&s1,&s2);

	}

}

