#include <stdio.h>
#include <stdlib.h>



struct node
{
  int number;
  struct node *next;
};

struct stack
{
  struct node *top;
};



void stack_init(struct stack *s)
{
  s->top = NULL;
}

void stack_push(struct stack *s, int number)
{
  struct node *p_new_node;

  p_new_node = malloc(sizeof(struct node));
  if (p_new_node == NULL)
  {
    printf("malloc error\n");
    return;
  }

  p_new_node->number = number;

  if (s->top == NULL)
    p_new_node->next = NULL;
  else
    p_new_node->next = s->top;

  s->top = p_new_node;
}

int stack_pop(struct stack *s)
{
  int number;
  struct node *p_top_next;

  if (s->top == NULL)
  {
    printf("stack is empty\n");
    return -1;
  }

  p_top_next = s->top->next;
  number = s->top->number;
  free(s->top);
  s->top = p_top_next;

  return number;
}


int main(void)
{
  struct stack my_stack;

  stack_init(&my_stack);

  for (int i = 0; i < 2; i++)
  {
    stack_push(&my_stack, i + 1);
    printf("push = %d\n", i + 1);
  }

  for (int i = 0; i < 2; i++)
  {
    printf("pop = %d\n", stack_pop(&my_stack));
  }

  return 0;
}
