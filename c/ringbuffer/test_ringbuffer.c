#include <assert.h>
#include <stdio.h>
#include <string.h>

#include "ringbuffer.h"

uint8_t tx_buff[32];
ringbuffer_t tx_buff_rb;

void init_buff(uint8_t *buff, size_t len)
{
    int i;

    for (i = 0; i < len; i++) {
        buff[i] = 0;
    }
}

void pr_buff(uint8_t *buff, size_t len)
{
    int i;

    printf("\n");
    for (i = 0; i < len; i++) {
        printf("buff[%d] = %d\n", i, buff[i]);
    }
}

void pr_rb_info(ringbuffer_t *rb)
{
    int i;
    printf("\n");

    for (i = 0; i < rb->size; i++) {
        printf("rb->buff[%d] = %d\n", i, rb->buff[i]);
    }
    printf("rb->size = %zu\n", rb->size);
    printf("rb->head = %zu\n", rb->head);
    printf("rb->tail = %zu\n", rb->tail);
    printf("rb->count = %zu\n", rb->count);
}

int main(void)
{
    int i;
    size_t ret;

    uint8_t txd_even[48] = {0};
    uint8_t txd_odd[48] = {0};

    uint8_t rxd_buff[48] = {0};

    for (i = 0; i < 48; i++) {
        txd_even[i] = 2 * i;
        txd_odd[i] = 2 * i + 1;
    }

    rb_init(&tx_buff_rb, tx_buff, 32);

    /* write 48 bytes more than max size of ring buffer */
    rb_write(&tx_buff_rb, txd_even, 48);
    pr_rb_info(&tx_buff_rb);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 31);
    assert(tx_buff_rb.tail == 0);
    assert(tx_buff_rb.count == 31);

    /* write data when ring buffer is full */
    rb_write(&tx_buff_rb, txd_odd, 48);
    pr_rb_info(&tx_buff_rb);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 31);
    assert(tx_buff_rb.tail == 0);
    assert(tx_buff_rb.count == 31);

    /* read all data from ring buffer */
    rb_read(&tx_buff_rb, rxd_buff, 48);
    pr_rb_info(&tx_buff_rb);
    pr_buff(rxd_buff, 48);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 31);
    assert(tx_buff_rb.tail == 31);
    assert(tx_buff_rb.count == 0);

    /* write 1 byte to the end of ring buffer */
    rb_write(&tx_buff_rb, txd_odd, 1);
    pr_rb_info(&tx_buff_rb);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 0);
    assert(tx_buff_rb.tail == 31);
    assert(tx_buff_rb.count == 1);

    /* read 1 byte from end of ring buffer */
    init_buff(rxd_buff, 48);
    rb_read(&tx_buff_rb, rxd_buff, 48);
    pr_buff(rxd_buff, 48);
    pr_rb_info(&tx_buff_rb);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 0);
    assert(tx_buff_rb.tail == 0);
    assert(tx_buff_rb.count == 0);

    /* read data when ring buffer is empty */
    init_buff(rxd_buff, 48);
    rb_read(&tx_buff_rb, rxd_buff, 48);
    pr_buff(rxd_buff, 48);
    pr_rb_info(&tx_buff_rb);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 0);
    assert(tx_buff_rb.tail == 0);
    assert(tx_buff_rb.count == 0);

    /* write 30 bytes */
    rb_write(&tx_buff_rb, txd_odd, 30);
    pr_buff(txd_odd, 30);
    pr_rb_info(&tx_buff_rb);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 30);
    assert(tx_buff_rb.tail == 0);
    assert(tx_buff_rb.count == 30);

    /* read 25 bytes */
    init_buff(rxd_buff, 48);
    rb_read(&tx_buff_rb, rxd_buff, 25);
    pr_buff(rxd_buff, 25);
    pr_rb_info(&tx_buff_rb);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 30);
    assert(tx_buff_rb.tail == 25);
    assert(tx_buff_rb.count == 5);

    /* write 20 bytes */
    rb_write(&tx_buff_rb, txd_even, 20);
    pr_buff(txd_even, 20);
    pr_rb_info(&tx_buff_rb);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 18);
    assert(tx_buff_rb.tail == 25);
    assert(tx_buff_rb.count == 25);

    /* read 15 bytes */
    init_buff(rxd_buff, 48);
    rb_read(&tx_buff_rb, rxd_buff, 15);
    pr_buff(rxd_buff, 15);
    pr_rb_info(&tx_buff_rb);
    assert(tx_buff_rb.size == 32);
    assert(tx_buff_rb.head == 18);
    assert(tx_buff_rb.tail == 8);
    assert(tx_buff_rb.count == 10);

    return 0;
}
