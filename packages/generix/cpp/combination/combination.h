#include <napi.h>

namespace combination {
    std::vector <std::vector<Napi::Value>> generateWithoutRepetition(
            const std::vector <Napi::Value> &elements,
            int startIndex,
            const std::vector <Napi::Value> &currentCombination,
            int n,
            int m,
            Napi::Env env
    );

    Napi::Array convertArrayToNapiArray(const Napi::Env &env, const std::vector <Napi::Value> &elements);

    Napi::Value withoutRepetition(const Napi::CallbackInfo &info);
}
