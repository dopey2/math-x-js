#include <napi.h>
#include "./combination/combination.h"

Napi::Object InitAll(Napi::Env env, Napi::Object exports) {
    exports.Set("c_withoutRepetition", Napi::Function::New(env, combination::withoutRepetition));
    exports.Set("c_withRepetition", Napi::Function::New(env, combination::withRepetition));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, InitAll);
