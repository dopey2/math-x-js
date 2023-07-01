#include <napi.h>

namespace combination {
    Napi::Array convertArrayToNapiArray(const Napi::Env &env, const std::vector <Napi::Value> &elements);

    std::vector <std::vector<Napi::Value>> generateWithoutRepetition(
            const std::vector <Napi::Value> &elements,
            int startIndex,
            const std::vector <Napi::Value> &currentCombination,
            int n,
            int m
    );

    Napi::Value withoutRepetition(const Napi::CallbackInfo &info);

    std::vector <std::vector<Napi::Value>> generateWithRepetition(
            const std::vector <Napi::Value> &elements,
            std::vector<int> &currentIndexes,
            int n,
            int index,
            int startIndex
    );

    Napi::Value withRepetition(const Napi::CallbackInfo &info);
}
