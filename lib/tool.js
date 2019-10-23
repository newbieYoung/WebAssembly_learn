const SIZE_OFFSET = -4;
const ID_OFFSET = -8;
const STRING_ID = 1;
const CHUNKSIZE = 1024;

/** Gets a string from an U32 and an U16 view on a memory. */
function getStringImpl(buffer, ptr) {
  const U32 = new Uint32Array(buffer);
  const U16 = new Uint16Array(buffer);
  var length = U32[(ptr + SIZE_OFFSET) >>> 2] >>> 1;
  var offset = ptr >>> 1;
  if (length <= CHUNKSIZE) return String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
  const parts = [];
  do {
    const last = U16[offset + CHUNKSIZE - 1];
    const size = last >= 0xD800 && last < 0xDC00 ? CHUNKSIZE - 1 : CHUNKSIZE;
    parts.push(String.fromCharCode.apply(String, U16.subarray(offset, offset += size)));
    length -= size;
  } while (length > CHUNKSIZE);
  return parts.join("") + String.fromCharCode.apply(String, U16.subarray(offset, offset + length));
}

/* -------------- */

/** Reads a string from the module's memory by its pointer. */
function __getString(memory, ptr) {
  const buffer = memory.buffer;
  const id = new Uint32Array(buffer)[ptr + ID_OFFSET >>> 2];
  if (id !== STRING_ID) throw Error("not a string: " + ptr);
  return getStringImpl(buffer, ptr);
}

/** Allocates a new string in the module's memory and returns its retained pointer. */
function __allocString(exports, str) {
  const length = str.length;
  const ptr = exports.__alloc(length << 1, STRING_ID);
  const U16 = new Uint16Array(exports.memory.buffer);
  for (var i = 0, p = ptr >>> 1; i < length; ++i) U16[p + i] = str.charCodeAt(i);
  return ptr;
}