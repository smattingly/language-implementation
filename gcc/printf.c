/* gcc -S -masm=intel -o printf.s printf.c */

#include <stdio.h>

void main() {
    printf("%d\n", 1);
}