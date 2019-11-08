/*
Copyright 2019 Adobe Inc. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

const TheHelper = require('../src/runtime-helpers.js')

describe('RuntimeHelper has the right functions', () => {
  test('exports', () => {
    expect(typeof TheHelper).toEqual('object')
    expect(typeof TheHelper.createKeyValueArrayFromFile).toEqual('function')
    expect(typeof TheHelper.createKeyValueArrayFromFlag).toEqual('function')
    expect(typeof TheHelper.createKeyValueObjectFromFile).toEqual('function')
    expect(typeof TheHelper.createKeyValueObjectFromFlag).toEqual('function')
    expect(typeof TheHelper.parsePathPattern).toEqual('function')
  })
})

beforeAll(() => {
  const json = {
    'file.json': fixtureFile('/trigger/parameters.json')
  }
  fakeFileSystem.addJson(json)
})

afterAll(() => {
  // reset back to normal
  fakeFileSystem.reset()
})

describe('createKeyValueArrayFromFlag', () => {
  test('fail when flag length is odd', () => {
    const func = () => TheHelper.createKeyValueArrayFromFlag(['key1'])
    expect(func).toThrow(new Error('Please provide correct values for flags'))
  })
  test('array of key:value (string) pairs', () => {
    const res = TheHelper.createKeyValueArrayFromFlag(['name1', 'val1', 'name2', 'val2'])
    expect(res).toMatchObject([{ key: 'name1', value: 'val1' }, { key: 'name2', value: 'val2' }])
  })
  test('array of key:value (object) pairs', () => {
    const res = TheHelper.createKeyValueArrayFromFlag(['name1', '["val0","val1"]', 'name2', 'val2'])
    expect(typeof res[0].value).toEqual('object')
    expect(res).toMatchObject([{ key: 'name1', value: ['val0', 'val1'] }, { key: 'name2', value: 'val2' }])
  })
})

describe('createKeyValueObjectFromFlag', () => {
  test('fail when flag length is odd', () => {
    const func = () => TheHelper.createKeyValueObjectFromFlag(['key1'])
    expect(func).toThrow(new Error('Please provide correct values for flags'))
  })
  test('array of key:value (string) pairs', () => {
    const res = TheHelper.createKeyValueObjectFromFlag(['name1', 'val1', 'name2', 'val2'])
    expect(res).toMatchObject({ name1: 'val1', name2: 'val2' })
  })
  test('array of key:value (object) pairs', () => {
    const res = TheHelper.createKeyValueObjectFromFlag(['name1', '["val0","val1"]', 'name2', 'val2'])
    expect(typeof res).toEqual('object')
    expect(res).toMatchObject({ name1: ['val0', 'val1'], name2: 'val2' })
  })
})

describe('createKeyValueArrayFromFile', () => {
  test('array of key:value pairs', () => {
    const res = TheHelper.createKeyValueArrayFromFile('/file.json')
    expect(typeof res).toEqual('object')
    expect(res).toMatchObject([{ key: 'param1', value: 'param1value' }, { key: 'param2', value: 'param2value' }])
  })
})

describe('createKeyValueObjectFromFile', () => {
  test('object with key:value pairs', () => {
    const res = TheHelper.createKeyValueObjectFromFile('/file.json')
    expect(typeof res).toEqual('object')
    expect(res).toMatchObject({ param1: 'param1value', param2: 'param2value' })
  })
})

describe('parsePathPattern', () => {
  // expect(Vishal)toWriteThis()
  test('test with namespace and name in path', () => {
    const [, namespace, name] = TheHelper.parsePathPattern('/53444_28782/name1')
    expect(typeof namespace).toEqual('string')
    expect(namespace).toEqual('53444_28782')
    expect(typeof name).toEqual('string')
    expect(name).toEqual('name1')
  })
  test('test with only name in path', () => {
    const [, namespace, name] = TheHelper.parsePathPattern('name1')
    expect(namespace).toEqual(null)
    expect(typeof name).toEqual('string')
    expect(name).toEqual('name1')
  })
})

describe('fileExtensionForKind', () => {
  test('map action kind to file extension', () => {
    expect(TheHelper.fileExtensionForKind('ballerina:abc')).toEqual('.bal')
    expect(TheHelper.fileExtensionForKind('dotnet:abc')).toEqual('.cs')
    expect(TheHelper.fileExtensionForKind('go:abc')).toEqual('.go')
    expect(TheHelper.fileExtensionForKind('java:abc')).toEqual('.java')
    expect(TheHelper.fileExtensionForKind('nodejs:abc')).toEqual('.js')
    expect(TheHelper.fileExtensionForKind('php:abc')).toEqual('.php')
    expect(TheHelper.fileExtensionForKind('python:abc')).toEqual('.py')
    expect(TheHelper.fileExtensionForKind('ruby:abc')).toEqual('.rb')
    expect(TheHelper.fileExtensionForKind('rust:abc')).toEqual('.rs')
    expect(TheHelper.fileExtensionForKind('swift:abc')).toEqual('.swift')

    // all kinds are colon separated but test defensively anyway
    expect(TheHelper.fileExtensionForKind('swift')).toEqual('.swift')

    // unknown kinds return ''
    expect(TheHelper.fileExtensionForKind('???:???')).toEqual('')
    expect(TheHelper.fileExtensionForKind('???')).toEqual('')
    expect(TheHelper.fileExtensionForKind('')).toEqual('')
    expect(TheHelper.fileExtensionForKind(undefined)).toEqual('')
  })
})

describe('kindForFileExtension', () => {
  test('map action kind to file extension', () => {
    expect(TheHelper.kindForFileExtension('f.bal')).toEqual('ballerina:default')
    expect(TheHelper.kindForFileExtension('f.cs')).toEqual('dotnet:default')
    expect(TheHelper.kindForFileExtension('f.go')).toEqual('go:default')
    expect(TheHelper.kindForFileExtension('f.java')).toEqual('java:default')
    expect(TheHelper.kindForFileExtension('f.js')).toEqual('nodejs:default')
    expect(TheHelper.kindForFileExtension('f.php')).toEqual('php:default')
    expect(TheHelper.kindForFileExtension('f.py')).toEqual('python:default')
    expect(TheHelper.kindForFileExtension('f.rb')).toEqual('ruby:default')
    expect(TheHelper.kindForFileExtension('f.rs')).toEqual('rust:default')
    expect(TheHelper.kindForFileExtension('f.swift')).toEqual('swift:default')

    expect(TheHelper.kindForFileExtension(undefined)).toEqual(undefined)
    expect(TheHelper.kindForFileExtension('')).toEqual(undefined)
    expect(TheHelper.kindForFileExtension('.')).toEqual(undefined)
    expect(TheHelper.kindForFileExtension('.js')).toEqual(undefined)
    expect(TheHelper.kindForFileExtension('???')).toEqual(undefined)
  })
})
