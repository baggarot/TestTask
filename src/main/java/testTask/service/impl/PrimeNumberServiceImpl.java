package testTask.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import testTask.service.PrimeNumberService;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class PrimeNumberServiceImpl implements PrimeNumberService {

    @Override
    public int[] arrayFill(int size) {
        int[] array = new int[size];
        int value;
        for (int i = 0; i < size; i++) {
            do {
                value = fillingInPrimeNumbers();
            } while (test(array, value, i));
            array[i] = value;
        }
        return array;
    }

    @Override
    public int[] arrayGeneration(String[] array) {
        int[] newArray = new int[array.length];
        Random random = new Random();
        int index;
        for (int i = 0; i < array.length; i++) {
            do {
                index = random.nextInt(array.length);
            } while (test(newArray, index, i));
            newArray[i] = Integer.parseInt(array[index]);
        }
        return newArray;
    }

    private int fillingInPrimeNumbers() {
        Random random = new Random();
        int primeNumber = random.nextInt(1000000);
        for (int i = 2; i <= primeNumber / 2; i++) {
            if (primeNumber % i == 0) return fillingInPrimeNumbers();
        }
        return primeNumber;
    }

    private static boolean test(int[] arr, int val, int count) {
        for (int j = 0; j <= count; j++) {
            if (arr[j] == val) return true;
        }
        return false;
    }
}