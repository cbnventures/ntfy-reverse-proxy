import type { Lib_PublicDnsUnreachableError_Runner_Constructor_ResolverHost } from '../types/lib/public-dns-unreachable-error.d.ts';

/**
 * Lib - Public DNS Unreachable Error.
 *
 * Thrown when the public DNS resolver can't be reached at all, such as on a network
 * that blocks DNS over HTTPS, so callers can skip the check instead of waiting on it.
 *
 * @since 2.6.2
 */
export class Runner extends Error {
  /**
   * Lib - Public DNS Unreachable Error - Constructor.
   *
   * Names the resolver host in the message, so the warning a caller logs says
   * which service couldn't be reached.
   *
   * @param {Lib_PublicDnsUnreachableError_Runner_Constructor_ResolverHost} resolverHost - Resolver host.
   *
   * @since 2.6.2
   */
  public constructor(resolverHost: Lib_PublicDnsUnreachableError_Runner_Constructor_ResolverHost) {
    super(`Couldn't reach public DNS (${resolverHost})`);

    this.name = 'PublicDnsUnreachableError';

    return;
  }
}
