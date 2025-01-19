import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  Paused as PausedEvent,
  Staked as StakedEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  Unpaused as UnpausedEvent,
  Unstaked as UnstakedEvent,
  Upgraded as UpgradedEvent,
} from "../generated/BoosterBronze/BoosterBronze";
import { Booster } from "../generated/schema";

export function handlePaused(event: PausedEvent): void {
  const id = Bytes.fromUTF8("Bronze" + event.params.account.toString());
  const booster = Booster.load(id);

  if (booster) {
    booster.isPaused = true;
    booster.save();
  }
}

export function handleStaked(event: StakedEvent): void {
  const id = Bytes.fromUTF8("Bronze" + event.params.user.toString());
  const booster = Booster.load(id);

  if (!booster) {
    const newBooster = new Booster(id);
    newBooster.user = event.params.user;

    newBooster.startTimestamp = event.block.timestamp;
    newBooster.stakeType = event.params.stakeType;
    newBooster.tier = "Bronze";

    newBooster.endTimestamp = event.block.timestamp.plus(
      event.params.stakeType
    );

    newBooster.isPaused = false;
    newBooster.hasUnstaked = false;
    newBooster.save();
  }

  //check if user can stake multiple times after unstaking
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  //TODO when does this happen?
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  const id = Bytes.fromUTF8("Bronze" + event.params.operator.toString());
  const booster = Booster.load(id);

  if (booster) {
    booster.transferedTo = event.params.to;
    booster.save();
  }
}

export function handleUnpaused(event: UnpausedEvent): void {
  const id = Bytes.fromUTF8("Bronze" + event.params.account.toString());
  const booster = Booster.load(id);

  if (booster && booster.pausedTimestamp) {
    const pausedTimestamp: BigInt = booster.pausedTimestamp
      ? (booster.pausedTimestamp as BigInt)
      : BigInt.fromI32(0);
    const timeToAdd = event.block.timestamp.minus(pausedTimestamp);
    booster.endTimestamp = booster.endTimestamp.plus(timeToAdd);
    booster.isPaused = false;
    booster.save();
  }
}

export function handleUnstaked(event: UnstakedEvent): void {
  const id = Bytes.fromUTF8("Bronze" + event.params.user.toString());
  const booster = Booster.load(id);

  if (booster) {
    booster.hasUnstaked = true;
    booster.save();
  }
}

export function handleUpgraded(event: UpgradedEvent): void {
  const id = Bytes.fromUTF8("Bronze" + event.params.user.toString());
  const booster = Booster.load(id);

  if (booster) {
    booster.stakeType = event.params.stakeType;
    booster.endTimestamp = booster.startTimestamp.plus(event.params.stakeType);

    booster.save();
  }
}
