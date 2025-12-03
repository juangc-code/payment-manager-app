// import React, { useEffect, useState } from 'react'
// import { authenticate, deposit, isWebView } from '@lemoncash/mini-app-sdk'
import Router from "./routes/Router";
import { AppProvider } from "./context/AppProvider";
import { AuthProvider } from "./context/AuthProvider";

// Replace with your backend URL (keep in env or build-time)
// const BACKEND = (import.meta.env.VITE_BACKEND_URL) || 'http://localhost:4000'

// const PRODUCTS = [
//   { id: 'p1', name: 'Product A', suggested_local: 1200 },
//   { id: 'p2', name: 'Product B', suggested_local: 2500 },
// ]

export default function App() {
  // const [tg, setTg] = useState(null)
  // const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0].id)
  // const [localAmount, setLocalAmount] = useState('')
  // const [cryptoAmount, setCryptoAmount] = useState(null)
  // const [tokenName, setTokenName] = useState('USDC') // example
  // const [loading, setLoading] = useState(false)
  // const [status, setStatus] = useState('idle')
  // const [txHash, setTxHash] = useState(null)
  // const [orderId, setOrderId] = useState(null)

  // useEffect(() => {
  //   // Telegram WebApp initialization (if running inside Telegram)
  //   if (window?.Telegram?.WebApp) {
  //     const tgWebApp = window.Telegram.WebApp
  //     tgWebApp.ready()
  //     setTg(tgWebApp)
  //     // Use MainButton if desired:
  //     tgWebApp.MainButton.hide()
  //   }
  // }, [])

  // // Ask backend for conversion: local -> crypto (server picks rate + fee)
  // async function convertLocalToCrypto() {
  //   if (!localAmount || Number(localAmount) <= 0) return
  //   setLoading(true)
  //   try {
  //     const res = await fetch(`${BACKEND}/convert`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         localAmount: Number(localAmount),
  //         currency: 'ARS', // change as needed
  //         token: tokenName,
  //         productId: selectedProduct
  //       }),
  //     })
  //     const json = await res.json()
  //     if (!res.ok) throw new Error(json?.error || 'convert-failed')
  //     setCryptoAmount(json.cryptoAmount) // backend returns string like "0.00012345"
  //   } catch (err) {
  //     console.error(err)
  //     alert('Conversion failed')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // // Create an order (backend stores it) and deposit via Lemon SDK
  // async function handlePay() {
  //   if (!cryptoAmount) return alert('Calculate conversion first')
  //   setStatus('creating_order')
  //   try {
  //     // create order on backend (returns payment_id)
  //     const orderResp = await fetch(`${BACKEND}/create-order`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         localAmount: Number(localAmount),
  //         cryptoAmount: cryptoAmount,
  //         token: tokenName,
  //         productId: selectedProduct,
  //       }),
  //     })
  //     const orderJson = await orderResp.json()
  //     if (!orderResp.ok) throw new Error(orderJson?.error || 'create-order-failed')
  //     const paymentId = orderJson.paymentId
  //     setOrderId(paymentId)

  //     // Now authenticate with Lemon inside the same WebView (runs inside Telegram)
  //     setStatus('authenticating')
  //     const auth = await authenticate()
  //     if (!auth || auth.result !== 'SUCCESS' && auth.result !== 0) {
  //       // Some SDKs return numeric enums, check docs. This is tolerant.
  //       // Fallback: still try to deposit if SDK allowed.
  //       console.warn('authenticate result', auth)
  //     }

  //     // Deposit: call Lemon SDK deposit with the crypto amount (or use local amount depending on flow)
  //     // NOTE: check Lemon SDK docs for the exact required fields/format. This is illustrative.
  //     setStatus('depositing')
  //     const depositResult = await deposit({
  //       amount: String(cryptoAmount),
  //       tokenName: tokenName,
  //       // you may pass metadata or reference for backend reconciliation
  //       referenceId: paymentId,
  //     })

  //     // depositResult expected to include txHash (or similar)
  //     console.log('depositResult', depositResult)
  //     if (depositResult?.txHash) {
  //       setTxHash(depositResult.txHash)
  //       setStatus('success')
  //       // Optionally notify backend of success (if Lemon doesn't push webhook)
  //       await fetch(`${BACKEND}/notify-success`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ paymentId, txHash: depositResult.txHash })
  //       })
  //     } else {
  //       setStatus('success_no_tx')
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     setStatus('error')
  //     alert('Payment failed')
  //   }
  // }

  // const copyTx = async () => {
  //   if (!txHash) return
  //   try {
  //     await navigator.clipboard.writeText(txHash)
  //     alert('txHash copied')
  //   } catch {}
  // }

  // return (
  //   <div style={{ maxWidth: 720, margin: '20px auto', padding: 16, fontFamily: 'system-ui, sans-serif' }}>
  //     <h2>Flowbyte — Pay with Lemon (inside Telegram)</h2>

  //     <div>
  //       <strong>Select product</strong>
  //       <div style={{ marginTop: 8 }}>
  //         {PRODUCTS.map(p => (
  //           <label key={p.id} style={{ display: 'block', marginBottom: 8 }}>
  //             <input
  //               type="radio"
  //               name="product"
  //               value={p.id}
  //               checked={selectedProduct === p.id}
  //               onChange={() => setSelectedProduct(p.id)}
  //             />
  //             {' '} {p.name} — suggested {p.suggested_local} ARS
  //           </label>
  //         ))}
  //       </div>
  //     </div>

  //     <div style={{ marginTop: 12 }}>
  //       <strong>Amount (local currency)</strong>
  //       <div>
  //         <input
  //           type="number"
  //           placeholder="e.g. 1500"
  //           value={localAmount}
  //           onChange={(e) => setLocalAmount(e.target.value)}
  //           style={{ padding: 8, fontSize: 16, width: 200 }}
  //         />
  //         <button onClick={convertLocalToCrypto} style={{ marginLeft: 8, padding: '8px 12px' }}>
  //           Convert
  //         </button>
  //       </div>
  //     </div>

  //     <div style={{ marginTop: 12 }}>
  //       <strong>Crypto</strong>
  //       <div>
  //         {loading ? 'calculating...' : cryptoAmount ? `${cryptoAmount} ${tokenName}` : '—'}
  //       </div>
  //     </div>

  //     <div style={{ marginTop: 16 }}>
  //       <button onClick={handlePay} style={{ padding: '12px 18px', fontSize: 16 }}>
  //         Pay {cryptoAmount ? `${cryptoAmount} ${tokenName}` : ''}
  //       </button>
  //     </div>

  //     <div style={{ marginTop: 18 }}>
  //       <strong>Status:</strong> {status}
  //     </div>

  //     {txHash && (
  //       <div style={{ marginTop: 12 }}>
  //         <strong>txHash</strong>
  //         <div style={{ wordBreak: 'break-all' }}>{txHash}</div>
  //         <button onClick={copyTx} style={{ marginTop: 8 }}>Copy txid</button>
  //       </div>
  //     )}

  //     <div style={{ marginTop: 24, color: '#666', fontSize: 13 }}>
  //       <p>Note: this Mini App runs inside Telegram WebView. Lemon SDK calls will succeed inside
  //         their supported environment. For production, secure rates and reconciliation server-side.</p>
  //     </div>
  //   </div>
  // )
  return (
    <AuthProvider>
      <AppProvider>
        <Router />
      </AppProvider>
    </AuthProvider>
  );
}
