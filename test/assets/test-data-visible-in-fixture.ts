/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { config, folio, TestInfo } from '../../';

const builder = folio.extend<{ testInfoForward: TestInfo }>();
builder.testInfoForward.init(async ({testInfo}, runTest) => {
  await runTest(testInfo);
  testInfo.data['myname'] = 'myvalue';
});
const { it, expect } = builder.build();

it('ensure fixture handles test error', async ({ testInfoForward }) => {
  console.log('console.log');
  console.error('console.error');
  expect(config.testDir).toBeTruthy();
  expect(testInfoForward.file).toContain('test-data-visible-in-fixture');
});
