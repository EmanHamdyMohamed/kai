import asyncio


async def run_functions_concurrently(coroutines):
    """Run multiple async functions concurrently."""
    return await asyncio.gather(*coroutines)
