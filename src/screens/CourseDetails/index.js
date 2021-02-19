/* eslint-disable react-native/no-inline-styles */
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import PropTypes from 'prop-types';
import { useTheme } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { View, StatusBar, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-renderer';
import { deviceWidth, deviceHeight, showErrorToast } from '@utils/index';
import RAButton1 from '@components/RAButton1';
import axios from 'axios';
import utilsAxios from '@utils/axios';
import base64 from 'base-64';
import { addDays, isAfter, format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
// import { format, subDays } from 'date-fns';
import useMarkdownRules from '@hooks/useMarkdownRules';
import { useHeaderHeight } from '@react-navigation/stack';
import useSWR from 'swr';
import ActionButton from '@components/ActionButton';
import { courseQuery } from '@hooks/useCoursesApiHook';
import Loading from '@components/loading';
import TextEle from '../../components/TextEle';

const subt = `Recipes in this write-up are protected by copyright law. Reproduction and distribution
of the same without a written consent from Studio D’ Food Couture is prohibited. ©
Studio De Food Couture `;

const YOUTUBE_VIDEO_HEIGHT = (deviceWidth / 16) * 9;

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});

const CourseDetails = ({ route, navigation }) => {
  const { id, userId } = route.params;
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const { data, isValidating, error } = useSWR([courseQuery(id, userId)]);
  const [playing, setPlaying] = useState(false);
  const headerHeight = useHeaderHeight();
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => [deviceHeight - YOUTUBE_VIDEO_HEIGHT - headerHeight, '100%'], [
    headerHeight,
  ]);

  const rules = useMarkdownRules();

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  const handleSheetChanges = useCallback(index => {
    setPlaying(index === 0);
  }, []);

  const createPurchaseOrder = useCallback(async () => {
    const authHeader = `Basic ${base64.encode('rzp_test_YI9BcxZ3N5ZRSL:gwpwHJWIcCaFYd6mmGdDCUY9')}`;
    const receipt = uuidv4();
    const res = await axios.post(
      'https://api.razorpay.com/v1/orders',
      {
        amount: data?.course?.price * 100,
        currency: data?.course?.currency,
        receipt,
      },
      {
        headers: { Authorization: authHeader },
      },
    );
    const orderDetails = await utilsAxios.post('purchase-details', {
      receipt,
      user_id: userId,
      course: data?.course?.id,
      amount: data?.course?.price,
      validity: data?.course?.validity,
      currency: res.data.currency,
      razorpay_order_id: res.data.id,
      amount_paid: res.data.amount_paid,
      amount_due: res.data.amount_due,
      offer_id: res.data.offer_id,
      status: res.data.status,
      attempts: res.data.attempts,
    });
    navigation.navigate('PurchaseUser', {
      orderDetails: orderDetails.data,
    });
  }, [
    data?.course?.price,
    data?.course?.currency,
    data?.course?.id,
    data?.course?.validity,
    userId,
    navigation,
  ]);

  const updatePurchaseOrder = useCallback(
    async purchaseId => {
      const authHeader = `Basic ${base64.encode(
        'rzp_test_YI9BcxZ3N5ZRSL:gwpwHJWIcCaFYd6mmGdDCUY9',
      )}`;
      const receipt = uuidv4();
      const res = await axios.post(
        'https://api.razorpay.com/v1/orders',
        {
          amount: data?.course?.price * 100,
          currency: data?.course?.currency,
          receipt,
        },
        {
          headers: { Authorization: authHeader },
        },
      );
      const orderDetails = await utilsAxios.put(`purchase-details/${purchaseId}`, {
        receipt,
        user_id: userId,
        course: data?.course?.id,
        amount: data?.course?.price,
        validity: data?.course?.validity,
        currency: res.data.currency,
        razorpay_order_id: res.data.id,
        amount_paid: res.data.amount_paid / 100,
        amount_due: res.data.amount_due / 100,
        offer_id: res.data.offer_id,
        status: res.data.status,
        attempts: res.data.attempts,
      });
      navigation.navigate('PurchaseUser', {
        orderDetails: orderDetails.data,
      });
    },
    [
      data?.course?.price,
      data?.course?.currency,
      data?.course?.id,
      data?.course?.validity,
      userId,
      navigation,
    ],
  );

  const buyCourse = useCallback(async () => {
    try {
      setLoading(true);
      const purchaseRes = await utilsAxios.get(
        `https://calm-oasis-43947.herokuapp.com/purchase-details?user_id=${userId}&course=${data?.course?.id}`,
      );

      if (purchaseRes.data.length === 0) {
        createPurchaseOrder();
      } else if (!purchaseRes.data.slice(-1)[0].purchase_date) {
        updatePurchaseOrder(purchaseRes.data.slice(-1)[0].id);
      } else if (purchaseRes.data.slice(-1)[0].purchase_date) {
        const purchaseOverDate = addDays(
          new Date(purchaseRes.data.slice(-1)[0].purchase_date),
          purchaseRes.data.slice(-1)[0].validity,
        );
        // TODO: Replace with server date
        if (isAfter(new Date(), purchaseOverDate)) {
          createPurchaseOrder();
        } else {
          showErrorToast(new Error('You Have already Purchased this course'));
        }
      }
    } catch (err) {
      showErrorToast(err);
    } finally {
      setLoading(false);
    }
  }, [createPurchaseOrder, updatePurchaseOrder, userId, data?.course?.id]);

  if (isValidating) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar hidden />
      <YoutubePlayer
        play={playing}
        height={YOUTUBE_VIDEO_HEIGHT}
        videoId={data?.course?.promoVideoYoutubeId}
      />
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={0}
        snapPoints={snapPoints}
        handleComponent={() => (
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              backgroundColor: colors.background,
            }}>
            <View
              style={{
                alignSelf: 'center',
                width: (8 * deviceWidth) / 100,
                height: 5,
                borderRadius: 4,
                backgroundColor: colors.text,
              }}
            />
          </View>
        )}
        onChange={handleSheetChanges}>
        <BottomSheetScrollView
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            flex: 1,
            backgroundColor: colors.background,
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <TextEle variant="header1" style={{ marginBottom: 10 }}>
              Key Points
            </TextEle>
            <View style={{ height: 2, width: 100, backgroundColor: colors.text }} />
          </View>
          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextEle variant="body2" style={{ paddingVertical: 10 }}>
                Duration
              </TextEle>
              <TextEle variant="body2" style={{ paddingVertical: 10, color: 'gray', width: 120 }}>
                Launching on
                {'  '}
                {data?.course?.launchDate
                  ? format(new Date(data?.course?.launchDate), 'yyyy-MM-dd HH:mm')
                  : data?.course?.launchDate}
              </TextEle>
            </View>
            <View style={{ height: 1, width: 400, backgroundColor: 'gray' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextEle variant="body2" style={{ paddingVertical: 10 }}>
                Total Recipes covered
              </TextEle>
              <TextEle variant="body2" style={{ paddingVertical: 10, color: 'gray', width: 120 }}>
                {/* {data?.course?.recipes} */}
              </TextEle>
            </View>
            <View style={{ height: 1, width: 400, backgroundColor: 'gray' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextEle variant="body2" style={{ paddingVertical: 10 }}>
                Video Validity
              </TextEle>
              <TextEle variant="body2" style={{ paddingVertical: 10, color: 'gray', width: 120 }}>
                {data?.course?.validity}
              </TextEle>
            </View>
            <View style={{ height: 1, width: 400, backgroundColor: 'gray' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextEle variant="body2" style={{ paddingVertical: 10 }}>
                Written Recipe
              </TextEle>
              <TextEle variant="body2" style={{ paddingVertical: 10, color: 'gray', width: 120 }}>
                Available
              </TextEle>
            </View>
            <View style={{ height: 1, width: 400, backgroundColor: 'gray' }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TextEle variant="body2" style={{ paddingVertical: 10 }}>
                Fees
              </TextEle>
              <TextEle variant="body2" style={{ paddingVertical: 10, color: 'gray', width: 120 }}>
                {data?.course?.price}
              </TextEle>
            </View>
            <View style={{ height: 1, width: 400, backgroundColor: 'gray' }} />
            <TextEle variant="caption" style={{ marginVertical: 20 }}>
              {subt}
            </TextEle>
          </View>
          <View style={{ marginBottom: 100 }}>
            <TextEle>Varieties:-</TextEle>
            <Markdown rules={rules}>{data?.course?.description}</Markdown>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
      <View style={{ position: 'absolute', left: 400, top: 640 }}>
        <ActionButton />
      </View>
      <RAButton1
        style={{ position: 'absolute', bottom: 10, width: '100%' }}
        variant="fill"
        text={`Buy For ${new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0,
          minimumFractionDigits: 0,
        }).format(data?.course?.price || 0)}`}
        onPress={buyCourse}
        disable={loading}
        loading={loading}
      />
    </View>
  );
};

CourseDetails.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  }).isRequired,
  navigation: PropTypes.func.isRequired,
};

export default CourseDetails;
