import {Types} from "aptos";

export type Table<K, V> = {
    handle: string
}

export type TableWithLength<K, V> = {
    inner: Table<K, V>,
    length: string,
}

export type Element<K, V> = {
    key: K,
    value: V
}
// key of simple map in response data is always string
export type SimpleMap<K extends string, V> = {
    data: Element<K, V>[]
}

export type vector<T> = T[]

export type GUID = {
    id: ID
};

/// A non-privileged identifier that can be freely created by anyone. Useful for looking up GUID's.
export type ID = {
    /// If creation_num is `i`, this is the `i+1`th GUID created by `addr`
    creation_num: Types.U64,
    /// Address that created the GUID
    addr: Types.Address
};

export type EventHandle<T> = {
    /// Total number of events emitted to this event stream.
    counter: Types.U64,
    /// A globally unique ID for this event stream.
    guid: GUID,
};

type x = Types.Event

export type SignerCapability = any;