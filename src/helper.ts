import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  HolderSentienceOne,
  HolderSentienceTwo,
  HolderSentienceThree,
  HolderSentienceFour,
  HolderSentienceFive,
} from "../generated/schema";

export function loadOrCreateHolderOne(address: Address): HolderSentienceOne {
  let holderEntity = HolderSentienceOne.load(address);

  if (!holderEntity) {
    holderEntity = new HolderSentienceOne(address);
    holderEntity.holdCount = BigInt.fromI32(0);
    let newIds = new Array<BigInt>(0);
    holderEntity.holdingIds = newIds;
  }

  return holderEntity;
}

export function loadOrCreateHolderTwo(address: Address): HolderSentienceTwo {
  let holderEntity = HolderSentienceTwo.load(address);

  if (!holderEntity) {
    holderEntity = new HolderSentienceTwo(address);
    holderEntity.holdCount = BigInt.fromI32(0);
    let newIds = new Array<BigInt>(0);
    holderEntity.holdingIds = newIds;
  }

  return holderEntity;
}

export function loadOrCreateHolderThree(
  address: Address
): HolderSentienceThree {
  let holderEntity = HolderSentienceThree.load(address);

  if (!holderEntity) {
    holderEntity = new HolderSentienceThree(address);
    holderEntity.holdCount = BigInt.fromI32(0);
    let newIds = new Array<BigInt>(0);
    holderEntity.holdingIds = newIds;
  }

  return holderEntity;
}

export function loadOrCreateHolderFour(address: Address): HolderSentienceFour {
  let holderEntity = HolderSentienceFour.load(address);

  if (!holderEntity) {
    holderEntity = new HolderSentienceFour(address);
    holderEntity.holdCount = BigInt.fromI32(0);
    let newIds = new Array<BigInt>(0);
    holderEntity.holdingIds = newIds;
  }

  return holderEntity;
}

export function loadOrCreateHolderFive(address: Address): HolderSentienceFive {
  let holderEntity = HolderSentienceFive.load(address);

  if (!holderEntity) {
    holderEntity = new HolderSentienceFive(address);
    holderEntity.holdCount = BigInt.fromI32(0);
    let newIds = new Array<BigInt>(0);
    holderEntity.holdingIds = newIds;
  }

  return holderEntity;
}
