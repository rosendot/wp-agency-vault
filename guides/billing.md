# Billing

## Stack

- **Stripe** — recurring subscription billing
- **Google Drive** — invoice records

## Setup per client

1. Log into Stripe dashboard
2. Create a new Customer with the client's name, business, and email
3. Create a Subscription:
   - Product: "Monthly Retainer"
   - Price: $399/mo recurring
   - Billing date: go-live date (first charge on launch day)
4. Send the client the payment link — they enter their card once, Stripe handles everything after
5. Stripe automatically retries failed payments and sends the client email reminders
6. You receive email notification on every successful charge

## Failed payments

Stripe retries failed charges automatically (3 attempts over 7 days by default). If all retries fail:
1. Stripe emails you and the client
2. Send the client a manual reminder
3. If unpaid after 14 days, put the site into maintenance mode
4. If unpaid after 30 days, take the site offline per contract terms

## Cancellations

Per the service agreement:
- Client must provide 30 days written notice
- Cancel the Stripe subscription on their final billing date
- Begin offboarding process (see `guides/offboarding.md`)
