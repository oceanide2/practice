#include <stdio.h>
#include <stdlib.h>



#define   MAX_NUM       30


typedef struct
{
  int index;
  short mem[MAX_NUM];
} stack_t;


void stack_init(stack_t *s)
{
  s->index = 0;

  for (int i = 0; i < MAX_NUM; i++)
  {
    s->mem[i] = 0;
  }
}

void stack_push(stack_t *s, short data)
{
  s->mem[s->index] = data;

  if (s->index >= MAX_NUM - 1)
  {
    s->index = MAX_NUM - 1;
  }
  else
  {
    s->index++;
  }
}

short stack_pop(stack_t *s)
{
  short data;

  data = s->mem[s->index];

  if (s->index <= 0)
  {
    s->index = 0;
  }
  else
  {
    s->index--;
  }

  return data;
}

int main(void)
{
  stack_t my_stack;
  short data;

  stack_init(&my_stack);


  for (int i = 0; i < 40; i++)
  {
    stack_push(&my_stack, i + 1);
  }

  for (int i = 0; i < MAX_NUM; i++)
  {
    printf("%d, ", my_stack.mem[i]);
  }
  printf("\n");

  for (int i = 0; i < 40; i++)
  {
    data = stack_pop(&my_stack);
    printf("%d, ", data);
  }
  printf("\n");

  return 0;
}
