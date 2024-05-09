import { Transfer as TransferEvent } from "../generated/SentienceModule1/SentienceModule1";
import { SentienceModule1Transfer as Transfer } from "../generated/schema";
import { loadOrCreateHolderOne } from "./helper";
import { BigInt } from "@graphprotocol/graph-ts";

export function handleTransferOne(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.save();

  if (event.params.from === event.params.to) return; //end here id sender is the same as recipient

  let recipient = loadOrCreateHolderOne(event.params.to);
  let sender = loadOrCreateHolderOne(event.params.from);

  recipient.holdCount = recipient.holdCount.plus(BigInt.fromI32(1));

  if (sender.holdCount.gt(BigInt.fromI32(0))) {
    sender.holdCount = sender.holdCount.minus(BigInt.fromI32(1));
  } else {
    sender.holdCount = BigInt.fromI32(0);
  }

  //SENDER
  if (sender.holdingIds.length > 1) {
    //search for the token id in the array and remove it
    let neWIds = sender.holdingIds;
    let index = neWIds.indexOf(event.params.tokenId);
    //if the token id is in the array, then remove it
    if (index > -1) {
      neWIds.splice(index, 1);
      sender.holdingIds = neWIds;
    }
  } else {
    //if the array has only one element, then it is the token id and we can just reset the array
    let newSenderIds = new Array<BigInt>(0);
    sender.holdingIds = newSenderIds;
  }

  //RECIPIENT
  let newIds = recipient.holdingIds;
  newIds.push(event.params.tokenId);
  recipient.holdingIds = newIds;

  sender.save();
  recipient.save();
}
