#include "combination.h"

namespace combination {

    Napi::Array convertArrayToNapiArray(const Napi::Env &env, const std::vector <Napi::Value> &elements) {
        Napi::Array result = Napi::Array::New(env, elements.size());
        for (size_t i = 0; i < elements.size(); i++) {
            result.Set(i, elements[i]);
        }
        return result;
    }

    std::vector <std::vector<Napi::Value>> generateWithoutRepetition(
            const std::vector <Napi::Value> &elements,
            int startIndex,
            const std::vector <Napi::Value> &currentCombination,
            int n,
            int m
    ) {
        std::vector <std::vector<Napi::Value>> result;

        if (currentCombination.size() >= n && currentCombination.size() <= m) {
            result.push_back(currentCombination);
        }

        if (currentCombination.size() >= m) {
            return result;
        }

        for (int i = startIndex; i < elements.size(); i++) {
            std::vector <Napi::Value> updatedCombination = currentCombination;
            updatedCombination.push_back(elements[i]);

            std::vector <std::vector<Napi::Value>> combinations = generateWithoutRepetition(
                    elements,
                    i + 1,
                    updatedCombination,
                    n,
                    m
            );

            result.insert(result.end(), combinations.begin(), combinations.end());
        }

        return result;
    }

    Napi::Value withoutRepetition(const Napi::CallbackInfo &info) {
        Napi::Env env = info.Env();
        Napi::Array elementsArray = info[0].As<Napi::Array>();
        int n = info[1].As<Napi::Number>().Int32Value();
        int m = info[2].As<Napi::Number>().Int32Value();

        std::vector <Napi::Value> elements;
        for (size_t i = 0; i < elementsArray.Length(); i++) {
            elements.push_back(elementsArray[i]);
        }

        std::vector <std::vector<Napi::Value>> result = generateWithoutRepetition(
                elements,
                0,
                std::vector<Napi::Value>(),
                n,
                m
        );

        Napi::Array resultArray = Napi::Array::New(env, result.size());
        for (size_t i = 0; i < result.size(); i++) {
            const std::vector <Napi::Value> &combination = result[i];
            Napi::Array combinationArray = convertArrayToNapiArray(env, combination);
            resultArray.Set(i, combinationArray);
        }

        return resultArray;
    }

    std::vector <std::vector<Napi::Value>> generateWithRepetition(
            const std::vector <Napi::Value> &elements,
            std::vector<int> &currentIndexes,
            int n,
            int index,
            int startIndex
    ) {
        std::vector <std::vector<Napi::Value>> result;

        if (index == n) {
            std::vector <Napi::Value> combo;
            for (int i = 0; i < n; i++) {
                combo.push_back(elements[currentIndexes[i]]);
            }
            result.push_back(combo);
            return result;
        }

        for (int i = startIndex; i < elements.size(); i++) {
            currentIndexes[index] = i;
            const std::vector <std::vector<Napi::Value>> &combinations = generateWithRepetition(
                    elements,
                    currentIndexes,
                    n,
                    index + 1,
                    i
            );
            result.insert(result.end(), combinations.begin(), combinations.end());
        }

        return result;
    }


    Napi::Value withRepetition(const Napi::CallbackInfo &info) {
        Napi::Env env = info.Env();
        Napi::Array elementsArray = info[0].As<Napi::Array>();
        int n = info[1].As<Napi::Number>().Int32Value();
        int m = info[2].As<Napi::Number>().Int32Value();

        std::vector <Napi::Value> elements;
        for (size_t i = 0; i < elementsArray.Length(); i++) {
            elements.push_back(elementsArray[i]);
        }

        std::vector <std::vector<Napi::Value>> result;
        for (int i = n; i <= m; i++) {
            std::vector<int> currentIndexes(i, 0);
            const std::vector <std::vector<Napi::Value>> &combinations = generateWithRepetition(
                    elements,
                    currentIndexes,
                    i,
                    0,
                    0
            );
            result.insert(result.end(), combinations.begin(), combinations.end());
        }

        Napi::Array resultArray = Napi::Array::New(env, result.size());

        for (size_t i = 0; i < result.size(); i++) {
            const std::vector <Napi::Value> &combination = result[i];
            Napi::Array combinationArray = convertArrayToNapiArray(env, combination);
            resultArray.Set(i, combinationArray);
        }

        return resultArray;
    }
}
