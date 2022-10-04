#include "qbuffer.h"
#include <assert.h>


qbuffer_t qbuffer;
uint8_t rx_buf[8];





int main(void)
{
  bool ret = true;
  uint8_t wdata[] = {1, 2, 3, 4, 5, 6, 7, 8};

  for (int i = 0; i < 8; i++)
  {
    assert(wdata[i] == (i + 1));
  }

  // create qbuffer
  ret = qbufferCreate(&qbuffer, rx_buf, 8);
  if (!ret)
  {
    printf("\n[Line:%d] qbufferCreate error\n", __LINE__);
  }

  assert(qbuffer.in  == 0);
  assert(qbuffer.out == 0);
  assert(qbuffer.len == 8);
  assert(&qbuffer.p_buf[0] == &rx_buf[0]);


  // write data to qbuffer
  ret = qbufferWrite(&qbuffer, wdata, 7);
  if (!ret)
  {
    printf("\n[Line:%d] qbufferWrite error\n", __LINE__);
  }

  assert(qbuffer.in  == 7);
  assert(qbuffer.out == 0);

  for (int i = 0; i < 7; i++)
  {
    assert(qbuffer.p_buf[i] == (i + 1));
  }

  // read data from qbuffer
  uint8_t rdata[8];

  ret = qbufferRead(&qbuffer, rdata, 4);
  if (!ret)
  {
    printf("\n[Line:%d] qbufferRead error\n", __LINE__);
  }

  assert(qbuffer.in  == 7);
  assert(qbuffer.out == 4);

  for (int i = 0; i < 4; i++)
  {
    assert(rdata[i] == (i + 1));
  }

  // write date to qbuffer
  ret = qbufferWrite(&qbuffer, wdata, 4);
  if (!ret)
  {
    printf("\n[Line:%d] qbufferWrite error\n", __LINE__);
  }

  assert(qbuffer.in  == 3);
  assert(qbuffer.out == 4);
  assert(qbuffer.len == 8);
  assert(qbufferAvailable(&qbuffer) > 0);

  // flush qbuffer
  qbufferFlush(&qbuffer);

  assert(qbuffer.in  == 0);
  assert(qbuffer.out == 0);

  return 0;
}
