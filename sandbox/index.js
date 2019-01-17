import React from "react";
import ReactDOM from "react-dom";
import Elastos, { Transaction } from "elastos-wallet-js";

const mnem = Elastos.generateMnemonic();
const seed = Elastos.getSeedFromMnemonic(mnem);
const privateKey = Elastos.getSinglePrivateKey(seed);
const publicKey = Elastos.getSinglePublicKey(seed);
const address = Elastos.getAddress(publicKey.toString('hex'));

const tx = new Transaction();

function getAddress() {
  console.log(mnem);
  console.log(privateKey);
  console.log(privateKey.toString());
  console.log(publicKey);
  console.log(publicKey.toString());
  return address;
}

function generateRawTransactionOnTestnet() {
  var testnet_endpoint = 'http://18.179.207.38:8080'; // Endpoint of wallet service for testnet
                                                      // Refer to: https://walletservice.readthedocs.io/
  var testnet_address_from = 'EJonBz8U1gYnANjSafRF9EAJW9KTwRKd6x';
  var testnet_address_to = 'EbunxcqXie6UExs5SXDbFZxr788iGGvAs9';
  var testnet_privateKey = '492f67d441f563aa4746497eb77c89906a3d3c06b242030ba966bc5604482ef7';
  tx.createTx('http://localhost:8081', testnet_address_from, testnet_address_to, 1000);
  console.log(tx);
  return tx.generateRawTransaction(testnet_privateKey);
  // After you can use tx.sendRawTx(testnet_endpoint) to send the rawTx to wallet service endpoint and it returns a transaction id hash
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div>Your ELA wallet is created, wallet address is:</div>
        <div><pre>{getAddress()}</pre></div>
        <hr/>
        <div>Sample code to generate a raw transaction hex string returns:</div>
        <div><pre>{generateRawTransactionOnTestnet()}</pre></div>
        <hr />
        <div>You can use this rawTx string to create a transaction with a REST API call:</div>
        <div><pre>curl -XPOST -H "Content-Type: application/json" -d '{'{'}"data": "{tx.rawTx}"}' 18.179.207.38:8080/api/1/sendRawTx</pre></div>
        <div>The result of response will be the transaction id hash, like:</div>
        <div><pre>{'{'}
          "result": "9211614c5d64e7929e18929aafdd3a406564a1ebc6c79f656b5a091e5a96af72",
          "status": 200
        }</pre></div>
        <hr />
        <div>After the transaction getting confirmed, you can check the result with REST API call:</div>
        <div>curl <a href="http://18.179.207.38:8080/api/1/tx/9211614c5d64e7929e18929aafdd3a406564a1ebc6c79f656b5a091e5a96af72" target="_blank">18.179.207.38:8080/api/1/tx/9211614c5d64e7929e18929aafdd3a406564a1ebc6c79f656b5a091e5a96af72</a></div>
        <div>And you can check the balance changes with:</div>
        <div>sender: EJonBz8U1gYnANjSafRF9EAJW9KTwRKd6x</div>
        <div>curl <a href="http://18.179.207.38:8080/api/1/balance/EJonBz8U1gYnANjSafRF9EAJW9KTwRKd6x" target="_blank">18.179.207.38:8080/api/1/balance/EJonBz8U1gYnANjSafRF9EAJW9KTwRKd6x</a></div>
        <div>receiver: EbunxcqXie6UExs5SXDbFZxr788iGGvAs9</div>
        <div>curl <a href="http://18.179.207.38:8080/api/1/balance/EbunxcqXie6UExs5SXDbFZxr788iGGvAs9" target="_blank">18.179.207.38:8080/api/1/balance/EbunxcqXie6UExs5SXDbFZxr788iGGvAs9</a></div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
