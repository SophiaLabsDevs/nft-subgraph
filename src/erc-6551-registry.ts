import {
  ERC6551AccountCreated as ERC6551AccountCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/ERC6551Registry/ERC6551Registry"
import {
  ERC6551AccountCreated,
  OwnershipTransferred,
} from "../generated/schema"

export function handleERC6551AccountCreated(
  event: ERC6551AccountCreatedEvent,
): void {
  let entity = new ERC6551AccountCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.account = event.params.account
  entity.implementation = event.params.implementation
  entity.salt = event.params.salt
  entity.chainId = event.params.chainId
  entity.tokenContract = event.params.tokenContract
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
