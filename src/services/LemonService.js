import { authenticate, deposit } from "@lemoncash/mini-app-sdk";

export async function lemonAuth() {
  return authenticate();
}

export async function lemonDeposit(amountInCrypto, currency="USDC") {
  return deposit({
    currency,
    amount: amountInCrypto
  });
}
