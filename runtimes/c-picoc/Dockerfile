FROM emscripten/emsdk:6.0.3 AS builder

WORKDIR /build
COPY build.sh /build/build.sh
COPY runtime_stubs.c /build/runtime_stubs.c
RUN chmod 0755 /build/build.sh && /build/build.sh

FROM scratch
COPY --from=builder /build/output/ /
