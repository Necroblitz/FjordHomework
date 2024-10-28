'use client'
import { tokenABI } from '@/libs/abi'
import { Address, createPublicClient, createWalletClient, custom, getContract, http } from 'viem'
import { sepolia } from 'viem/chains'
import { EthereumProvider } from '@walletconnect/ethereum-provider'
 
//@typescript-eslint/no-explicit-any
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
 
// eg: Metamask
export const walletClient = createWalletClient({
  chain: sepolia,
  transport: custom(window.ethereum!),
})
 
// eg: WalletConnect
const provider = await EthereumProvider.init({
  projectId: "abcd1234",
  showQrModal: true,
  chains: [sepolia.id],
})
 
export const walletClientWC = createWalletClient({
  chain: sepolia,
  transport: custom(provider),
})

export const tokenContract = getContract({
  address: process.env.TOKEN_ADDRESS as Address ?? "" as Address,
  abi: tokenABI,
  client: {public: publicClient,wallet: walletClient}

})

export const getTokenName = async () => { 
  return await tokenContract.read.name()
}