package com.oceanide;

import java.text.NumberFormat;

public class MortgageReport {
    private final MortgageCalculator calculator;
    private final NumberFormat currency = NumberFormat.getCurrencyInstance();

    public MortgageReport(MortgageCalculator calculator) {
        this.calculator = calculator;
    }

    void printMortgage() {
        double mortgage = calculator.calculateMortgage();
        String mortgageFormatted = currency.format(mortgage);
        System.out.println();
        System.out.println("MORTGAGE");
        System.out.println("--------");
        System.out.println("Monthly Payments: " + mortgageFormatted);
    }

     void printPaymentSchedule() {
        System.out.println();
        System.out.println("PAYMENT SCHEDULE");
        System.out.println("----------------");

        for (double balance: calculator.getBalances()) {
            System.out.println(currency.format(balance));
        }
    }
}
