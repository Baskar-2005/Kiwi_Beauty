import {useEffect, useState} from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMapsLibrary,
  APILoadingStatus,
} from '@vis.gl/react-google-maps';
import {
  Clock,
  Instagram,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react';
import {STUDIO_CONFIG} from '../config/studioConfig';
import {buildWhatsAppUrl} from '../utils/studioLogic';

const MAPS_API_KEY =
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

function StudioMapCanvas() {
  const status = useApiLoadingStatus();
  const placesLib = useMapsLibrary('places');
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);
  const [studioPosition, setStudioPosition] = useState<{
    lat: number;
    lng: number;
  }>(STUDIO_CONFIG.fallbackCoordinates);

  useEffect(() => {
    let active = true;
    async function lookupAddress() {
      if (!placesLib || !placesLib.Place?.searchByText) return;
      try {
        const {places} = await placesLib.Place.searchByText({
          textQuery: STUDIO_CONFIG.googleMapsSearchQuery,
          fields: ['location', 'displayName'],
          maxResultCount: 1,
        });
        const firstPlace = places?.[0];
        if (active && firstPlace?.location) {
          setStudioPosition({
            lat: firstPlace.location.lat(),
            lng: firstPlace.location.lng(),
          });
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes('RESOURCE_EXHAUSTED') ||
          msg.includes('OVER_QUERY_LIMIT') ||
          msg.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
      }
    }
    void lookupAddress();
    return () => {
      active = false;
    };
  }, [placesLib]);

  if (
    status === APILoadingStatus.FAILED ||
    status === APILoadingStatus.AUTH_FAILURE
  ) {
    return <FallbackStudioMapCard />;
  }

  return (
    <div className="w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-[#141312]/12 bg-[#EAE2D6]">
      <GoogleMap
        defaultCenter={studioPosition}
        center={studioPosition}
        defaultZoom={15}
        mapId="DEMO_MAP_ID"
        gestureHandling="cooperative"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        style={{width: '100%', height: '100%'}}
      >
        <AdvancedMarker
          ref={markerRef}
          position={studioPosition}
          title={STUDIO_CONFIG.brandName}
          onClick={() => setInfoOpen((prev) => !prev)}
        >
          <Pin
            background="#141312"
            borderColor="#C6A46C"
            glyphColor="#F7F4EE"
          />
        </AdvancedMarker>

        {infoOpen && marker && (
          <InfoWindow
            anchor={marker}
            maxWidth={240}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div className="p-1 text-[#141312]">
              <p className="font-semibold text-xs uppercase tracking-wider">
                {STUDIO_CONFIG.brandName}
              </p>
              <p className="mt-1 text-xs text-[#4C4640]">
                {STUDIO_CONFIG.fullAddress}
              </p>
              <a
                href={STUDIO_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-xs font-semibold underline text-[#141312]"
              >
                Get Directions
              </a>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

function FallbackStudioMapCard() {
  return (
    <div className="w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-[#141312]/12 bg-gradient-to-br from-[#EAE2D6] via-[#F3ECE1] to-[#E2D6C5] p-6 sm:p-8 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7B6B5B]">
            Studio Location
          </p>
          <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[#141312]">
            {STUDIO_CONFIG.brandName}
          </h3>
        </div>
        <div className="h-11 w-11 rounded-full bg-[#141312] text-[#F7F4EE] flex items-center justify-center shrink-0">
          <MapPin className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-sm sm:text-base text-[#3D3833] leading-relaxed">
          {STUDIO_CONFIG.fullAddress}
        </p>
        <a
          href={STUDIO_CONFIG.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#141312] text-[#F7F4EE] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#2A2826] transition-colors"
        >
          <Navigation className="h-4 w-4" aria-hidden="true" />
          <span>Open In Google Maps</span>
        </a>
      </div>
    </div>
  );
}

export function ContactAndMapSection() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 bg-[#EFE9DF]/65 border-t border-[#141312]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7B6B5B]">
                Visit The Studio
              </p>
              <h2 className="mt-3 font-serif text-3xl sm:text-4xl text-[#141312]">
                {STUDIO_CONFIG.brandName}
              </h2>

              <div className="mt-6 space-y-5 text-sm sm:text-base text-[#3D3833]">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="h-5 w-5 text-[#8B7355] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <address className="not-italic leading-relaxed">
                    {STUDIO_CONFIG.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>

                <div className="flex items-start gap-3">
                  <Clock
                    className="h-5 w-5 text-[#8B7355] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[#7B6B5B]">
                      Opening Hours
                    </p>
                    <p className="mt-0.5 font-medium tabular-nums text-[#141312]">
                      {STUDIO_CONFIG.openingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 pt-6 border-t border-[#141312]/10">
              <a
                href={`tel:+${STUDIO_CONFIG.whatsappNumber}`}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 bg-[#141312] text-[#F7F4EE] text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#2A2826] transition-colors"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>Call</span>
              </a>

              <a
                href={buildWhatsAppUrl(
                  STUDIO_CONFIG.whatsappNumber,
                  STUDIO_CONFIG.whatsappMessages.general,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 border border-[#141312]/30 text-[#141312] text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#EAE2D6] transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <a
                href={STUDIO_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 border border-[#141312]/30 text-[#141312] text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#EAE2D6] transition-colors"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span>Instagram</span>
              </a>

              <a
                href={STUDIO_CONFIG.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3 border border-[#141312]/30 text-[#141312] text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#EAE2D6] transition-colors"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                <span>Directions</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {MAPS_API_KEY ? (
              <APIProvider apiKey={MAPS_API_KEY} language="en" region="IN">
                <StudioMapCanvas />
              </APIProvider>
            ) : (
              <FallbackStudioMapCard />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
