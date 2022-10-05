#include <stdio.h>
#include <stdlib.h>


struct node
{
  int number;
  struct node *next;
};

struct stack
{
  struct node *head;
  struct node *tail;
};


void stack_init(struct stack *s)
{
  s->head = NULL;
  s->tail = NULL;
}

void stack_push(struct stack *s, int number)
{
  if (s->head == NULL)
  {
    s->head = malloc(sizeof(struct node));
    s->tail = s->head;
  }
  else
  {
    s->tail->next = malloc(sizeof(struct node));
    s->tail = s->tail->next;
  }

  // printf("s->tail = %p\n", s->tail);

  s->tail->number = number;
  s->tail->next = NULL;
}

int stack_pop(struct stack *s)
{
  struct node *p_head_save = s->head;

  struct node **pp_head = &s->head;
  struct node **pp_tail = &s->tail;

  int number;

  while ((*pp_head)->next != *pp_tail)
  {
    *pp_head = (*pp_head)->next;
  }

  number = (*pp_tail)->number;
  // printf("*pp_tail = %p\n", *pp_tail);
  free(*pp_tail);

  (*pp_head)->next = NULL;
  *pp_tail = *pp_head;
  *pp_head = p_head_save;

  return number;
}

void stack_show_entry(struct stack *s)
{
  struct node *p_head = s->head;

  while (p_head != NULL)
  {
    printf("%d\n", p_head->number);
    p_head = p_head->next;
  }
}

void stack_deinit(struct stack *s)
{
  struct node *pb;
  struct node *p_head = s->head;

  while (p_head != NULL)
  {
    pb = p_head->next;

    // printf("p_head = %p\n", p_head);
    free(p_head);
    p_head = pb;
  }
}

int main(void)
{
  struct stack my_stack;
  int number;

  stack_init(&my_stack);

  stack_push(&my_stack, 1);
  stack_push(&my_stack, 2);
  stack_push(&my_stack, 3);
  stack_push(&my_stack, 4);

  stack_pop(&my_stack);
  stack_pop(&my_stack);

  stack_show_entry(&my_stack);
  stack_deinit(&my_stack);

  return 0;
}
