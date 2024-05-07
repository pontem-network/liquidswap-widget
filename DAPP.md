Liquidswap widget could be used as DAPP inside wallet.
Work still in progress. 

<liquidswap-widget/> can be used without wallet adapter. 

It needs just several properties:
* Account address of wallet;
```typescript
const dataAccount = '0x15fd61229f6e12b51adbff45b7b74310c7eaf9c24ef8c13b653c8f2a07bc1d14';
```
* Network information: name and chainId;
```typescript
const dataNetwork = { name: 'mainnet', chainId: '1' };
```
* Transaction info: status and hash;
```typescript
interface ITransactionStatus {
  status: 'pending' | 'success' | 'error' | 'rejected';
  hash: string | null
};
const transactionStatus: ITransactionStatus = { status: 'pending', hash: null };
```
Optional:
* Custom Fee to set up widget with fee swap;
```typescript
const dataFee = {
 feeBasisPoint: "10",
 feeStruct: {
   'scripts::swap': 'address::module::function',
   'scripts_v2::swap': 'address::module::function',
   'scripts::swap_into': 'address::module::function',
   'scripts_v2::swap_into': 'address::module::function',
 }
}
```

Properties are passed as strings (data-attributes), so to pass Object you need to use JSON.stringify();
They will be extruded with JSON.parse();
Properties are reactive, so any change to props will update widget's internal store;

```jsx
<liquidswap-widget
    ref={ref}
    data-network={JSON.stringify(dataNetwork)}
    data-account={dataAccount}
    data-transaction={JSON.stringify(transactionStatus)}
    data-fee={JSON.stringify(dataFee)} // optional
/>
```

Also, widget will dispatch to Custom Events:
1) 'signAndSubmitTransaction' - this event will be containing payload with transaction. Just accept props inside handler 
and you will find prop 'detail' with full transaction payload;
2) 'transactionProcessed' - this event will be fired after widget accepts hash and status of transaction and correctly resolves it with. 

** IMPORTANT **
Then parent receives 'transactionProcessed' - You need to update status with 'pending' and hash should be set to null. Otherwise, it will be led to bugs due to incorrect source of truth.
