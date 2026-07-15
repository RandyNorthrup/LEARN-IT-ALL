#include <stdio.h>

int getdtablesize(void) {
  return 256;
}

char *getpass(const char *prompt) {
  static char empty_password[1] = {'\0'};
  if (prompt != NULL) {
    fputs(prompt, stderr);
  }
  return empty_password;
}
