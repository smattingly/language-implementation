/* gcc -S -masm=intel -o assign.s assign.c */

#include <stdio.h>

void main() {
    int a = 1;
    int b = a;
}