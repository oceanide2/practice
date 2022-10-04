#include <stdio.h>
#include <stdint.h>
#include <stdbool.h>



typedef struct
{
  uint32_t in;
  uint32_t out;
  uint32_t len;
  uint8_t *p_buf;
} qbuffer_t;


bool qbufferInit(void);
bool qbufferCreate(qbuffer_t *p_node, uint8_t *p_buf, uint32_t length);
bool qbufferWrite(qbuffer_t *p_node, uint8_t *p_data, uint32_t length);
bool qbufferRead(qbuffer_t *p_node, uint8_t *p_data, uint32_t length);
uint32_t qbufferAvailable(qbuffer_t *p_node);
void qbufferFlush(qbuffer_t *p_node);

