#include <stdint.h>
#include <stdlib.h>

void xor_encrypt(uint8_t* data, int length, uint8_t key) {
  for (int i = 0; i < length; i++) {
    data[i] ^= key;
  }
}
